import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { ValidateNumber } from '@app/validators/number.validator';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  // setter
  @Input() selectedProduct: Product = {
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
  @Input() vendors: Vendor[] | null = null;
  @Input() products: Product[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  productForm: FormGroup;
  vendorid: FormControl;
  id: FormControl;
  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  //qrcode: FormControl;
  qrcodetxt: FormControl;

  constructor(private builder: FormBuilder, private dialog: MatDialog) {
    this.vendorid = new FormControl('', Validators.compose([Validators.required]));
    this.id = new FormControl('', Validators.compose([this.uniqueCodeValidator.bind(this), Validators.required]));
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl('', Validators.compose([Validators.required]));
    this.msrp = new FormControl('', Validators.compose([Validators.required]));
    this.rop = new FormControl('', Validators.compose([Validators.required, ValidateNumber]));
    this.eoq = new FormControl('', Validators.compose([Validators.required, ValidateNumber]));
    this.qoh = new FormControl('', Validators.compose([Validators.required, ValidateNumber]));
    this.qoo = new FormControl('', Validators.compose([Validators.required, ValidateNumber]));
    //this.qrcode = new FormControl('', Validators.compose([Validators.required]));
    this.qrcodetxt = new FormControl('', Validators.compose([Validators.required]));
    this.productForm = this.builder.group({
      vendorid: this.vendorid,
      id: this.id,
      name: this.name,
      costprice: this.costprice,
      msrp: this.msrp,
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo,
      //qrcode: this.qrcode,
      qrcodetxt: this.qrcodetxt,
    });
  } // constructor
  ngOnInit(): void {
    // patchValue doesn't care if all values are present
    this.productForm.patchValue({
      vendorid: this.selectedProduct.vendorid,
      id: this.selectedProduct.id,
      name: this.selectedProduct.name,
      costprice: this.selectedProduct.costprice,
      msrp: this.selectedProduct.msrp,
      rop: this.selectedProduct.rop,
      eoq: this.selectedProduct.eoq,
      qoh: this.selectedProduct.qoh,
      qoo: this.selectedProduct.qoo,
      //qrcode: this.selectedProduct.qrcode,
      qrcodetxt: this.selectedProduct.qrcodetxt,
    });
  } // ngOnInit
  updateSelectedProduct(): void {
    this.selectedProduct.vendorid = this.productForm.value.vendorid;
    this.selectedProduct.id = this.productForm.value.id;
    this.selectedProduct.name = this.productForm.value.name;
    this.selectedProduct.costprice = this.productForm.value.costprice;
    this.selectedProduct.msrp = this.productForm.value.msrp;
    this.selectedProduct.rop = this.productForm.value.rop;
    this.selectedProduct.eoq = this.productForm.value.eoq;
    this.selectedProduct.qoh = this.productForm.value.qoh;
    this.selectedProduct.qoo = this.productForm.value.qoo;
    //this.selectedProduct.qrcode = this.productForm.value.qrcode;
    this.selectedProduct.qrcodetxt = this.productForm.value.qrcodetxt;
    this.saved.emit(this.selectedProduct);
  } // updateSelectedProduct
  /**
  * uniqueCodeValidator - needed access to products property so not
  * with the rest of the validators
  */
  uniqueCodeValidator(control: AbstractControl): { idExists: boolean } | null {
    if (this.products !== null) {
      if (
        this.products.find(
          (p) => p.id === control.value && !this.selectedProduct.id
        ) !== undefined
      ) {

        return { idExists: true };
      }
    }
    return null; // if we make it here there are no product codes
  } // uniqueCodeValidator
  openDeleteDialog(selectedProduct: Product): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: `Delete Product ${this.selectedProduct.id}`,
      entityname: 'product'
    };
    dialogConfig.panelClass = 'customdialog';
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleted.emit(this.selectedProduct);
      }
    });
  } // openDeleteDialog
} // ProductDetailComponent