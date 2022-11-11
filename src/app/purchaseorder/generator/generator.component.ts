import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vendor } from '@app/vendor/vendor';
import { Product } from '@app/product/product';
import { PurchaseorderItem } from '@app/purchaseorder/purchaseorder-item';
import { Purchaseorder } from '@app/purchaseorder/purchaseorder';
import { VendorService } from '@app/vendor/vendor.service';
import { ProductService } from '@app/product/product.service';
import { PurchaseorderService } from '@app/purchaseorder/purchaseorder.service';
import { PDFURL } from '@app/constants';
@Component({
	templateUrl: './generator.component.html',
})
export class GeneratorComponent implements OnInit, OnDestroy {
	// form
	generatorForm: FormGroup;
	vendorid: FormControl;
	productid: FormControl;
	eoq: FormControl;
	// data
	formSubscription?: Subscription;
	products$?: Observable<Product[]>; // everybody's products
	vendors$?: Observable<Vendor[]>; // all vendors
	vendorproducts$?: Observable<Product[]>; // all products for a particular vendor
	items: Array<PurchaseorderItem>; // product items that will be in purchaseorder
	eoqArr: Array<Number>;
	qty: number;
	selectedproducts: Product[]; // products that being displayed currently in app
	selectedProduct: Product; // the current selected product
	selectedVendor: Vendor; // the current selected vendor
	// misc
	pickedProduct: boolean;
	pickedVendor: boolean;
	pickedEOQ: boolean;
	generated: boolean;
	hasProducts: boolean;
	msg: string;
	total: number;
	tax: number;
	purchaseorderno: number = 0;
	constructor(
		private builder: FormBuilder,
		private vendorService: VendorService,
		private productService: ProductService,
		private purchaseorderService: PurchaseorderService
	) {
		this.pickedVendor = false;
		this.pickedProduct = false;
		this.pickedEOQ = false;
		this.qty = 0;
		this.generated = false;
		this.msg = '';
		this.vendorid = new FormControl('');
		this.productid = new FormControl('');
		this.eoq = new FormControl('');
		this.generatorForm = this.builder.group({
			productid: this.productid,
			vendorid: this.vendorid,
			eoq: this.eoq,
		});
		this.selectedProduct = {
			id: '',
			vendorid: 0,
			name: '',
			costprice: 0.0,
			msrp: 0.0,
			rop: 0.0,
			eoq: 0.0,
			qoh: 0.0,
			qoo: 0.0,
			qrcode: '',
			qrcodetxt: '',
		};
		this.selectedVendor = {
			id: 0,
			name: '',
			address1: '',
			city: '',
			province: '',
			postalcode: '',
			phone: '',
			type: '',
			email: '',
		};
		this.items = new Array<PurchaseorderItem>();
		this.selectedproducts = new Array<Product>();

		this.eoqArr = new Array<Number>();
		this.hasProducts = false;
		this.total = 0.0;
		this.tax = 0.0;
	} // constructor
	ngOnInit(): void {
		this.onPickVendor();
		this.onPickProduct();
		this.onPickEoq();
		this.msg = 'loading vendors and products from server...';
		(this.vendors$ = this.vendorService.get()),
			catchError((err) => (this.msg = err.message));
		(this.products$ = this.productService.get()),
			catchError((err) => (this.msg = err.message));
		this.msg = 'server data loaded';
	} // ngOnInit
	ngOnDestroy(): void {
		if (this.formSubscription !== undefined) {
			this.formSubscription.unsubscribe();
		}
	} // ngOnDestroy
	/**
	* onPickVendor - Another way to use Observables, subscribe to the select change event
	* then load specific vendor products for subsequent selection
	*/
	onPickVendor(): void {
		this.formSubscription = this.generatorForm
			.get('vendorid')
			?.valueChanges.subscribe((val) => {
				this.selectedProduct = {
					id: '',
					vendorid: 0,
					name: '',
					costprice: 0.0,
					msrp: 0.0,
					rop: 0.0,
					eoq: 0.0,
					qoh: 0.0,
					qoo: 0.0,
					qrcode: '',
					qrcodetxt: '',
				};
				this.selectedVendor = val;
				this.loadVendorProducts();
				this.pickedProduct = false;
				this.hasProducts = false;
				this.msg = 'choose product for vendor';
				this.pickedVendor = true;
				this.generated = false;
				this.items = []; // array for the purchaseorder
				this.selectedproducts = []; // array for the details in app html
			});
	} // onPickVendor
	/**
	* onPickProduct - subscribe to the select change event then
	* update array containing items.
	*/
	onPickProduct(): void {
		const productSubscription = this.generatorForm
			.get('productid')
			?.valueChanges.subscribe((val) => {
				this.selectedProduct = val;
				const item: PurchaseorderItem = {
					id: 0,
					poid: 0,
					productid: this.selectedProduct?.id,
					qty: 0,
					price: this.selectedProduct?.msrp,
				};
				if (
					this.items.find((item) => item.productid === this.selectedProduct?.id)
				) {

					// ignore entry
				} else {
					// add entry
					this.items.push(item);
					//this.selectedproducts.push(this.selectedProduct);
				}
				if (this.items.length > 0) {
					this.hasProducts = true;
				}
				this.total = 0.0;
				this.pickedProduct = true;
				this.eoqArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				this.selectedproducts.forEach((exp) => (this.total += exp.msrp));
			});
		this.formSubscription?.add(productSubscription); // add it as a child, so all can be destroyed together
	} // onPickProduct

	//
	onPickEoq(): void {
		const productSubscription2 = this.generatorForm
			.get('eoq')
			?.valueChanges.subscribe((val) => {

				if (this.items.find((item) => item.productid === this.selectedProduct?.id)) {
					//not EOQ
					if (val !== undefined) {
						const item: PurchaseorderItem = {
							id: 0,
							poid: 0,
							productid: this.selectedProduct?.id,
							qty: val,
							price: this.selectedProduct?.costprice,
						};
						if (val > 0) {
							var index = this.items.findIndex(obj => obj.productid == this.selectedProduct?.id);
							if (index !== -1)
								this.items[index] = item;
							this.msg = val + " " + this.selectedProduct.name + "(s) added";
							this.hasProducts = true;
						}
						else if (val === 0) {
							var index = this.items.findIndex(obj => obj.productid == this.selectedProduct?.id);
							this.items.splice(index, 1);
							this.msg = "all " + this.selectedProduct.name + " removed";
							if (this.items.length == 0) {
								this.msg = "No products"
								this.hasProducts = false;
							}
						}

					}
					else if (val === undefined) {
						// add eoq
						const item: PurchaseorderItem = {
							id: 0,
							poid: 0,
							productid: this.selectedProduct?.id,
							qty: this.selectedProduct?.eoq,
							price: this.selectedProduct?.costprice,
						};
						var index = this.items.findIndex(obj => obj.productid == this.selectedProduct?.id);
						if (index !== -1)
							this.items[index] = item;
						this.msg = this.selectedProduct?.eoq + " " + this.selectedProduct.name + "(s) added";
						this.hasProducts = true;
					}
					else {
						//ignore EOQ
					}
				}
				else {
					const item: PurchaseorderItem = {
						id: 0,
						poid: 0,
						productid: this.selectedProduct?.id,
						qty: val,
						price: this.selectedProduct?.costprice,
					};
					this.items.push(item);
					this.hasProducts = true;
				}
				if (this.items.length > 0) {
					this.hasProducts = true;
				}
				this.total = 0.0;

				this.items.forEach((exp) => (this.total += exp.price * exp.qty));
				this.tax = this.total * 0.13;
				this.total += this.tax;
			});
		this.formSubscription?.add(productSubscription2); // add it as a child, so all can be destroyed together
	}//onPickEOQ
	/**
	* loadVendorProducts - filter for a particular vendor's products
	*/
	loadVendorProducts(): void {
		this.vendorproducts$ = this.products$?.pipe(
			map((products) =>
				// map each product in the array and check whether or not it belongs to selected vendor
				products.filter(
					(product) => product.vendorid === this.selectedVendor?.id
				)
			)
		);
	} // loadVendorProducts
	/**
	* createPurchaseorder - create the client side purchaseorder
	*/
	createPurchaseorder(): void {
		this.generated = false;
		const purchaseorder: Purchaseorder = {
			id: 0,
			items: this.items,
			vendorid: this.selectedProduct.vendorid,
			amount: this.total,
			podate: '',
		};
		this.purchaseorderService.add(purchaseorder).subscribe({
			// observer object
			next: (purchaseorder: Purchaseorder) => {
				// server should be returning purchaseorder with new id
				purchaseorder.id > 0
					? (this.msg = `Purchaseorder ${purchaseorder.id} added!`)
					: (this.msg = 'Purchaseorder not added! - server error');
				this.purchaseorderno = purchaseorder.id;
			},
			error: (err: Error) => (this.msg = `Purchaseorder not added! - ${err.message}`),
			complete: () => {
				this.hasProducts = false;
				this.pickedVendor = false;
				this.pickedProduct = false;
				this.generated = true;
			},
		});
	} // createPurchaseorder
	viewPdf(): void {
		window.open(`${PDFURL}${this.purchaseorderno}`, '');
	} // viewPdf
} // GeneratorComponent