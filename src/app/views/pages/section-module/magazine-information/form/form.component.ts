import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@Input() form: FormGroup;

	constructor() {
	}

	ngOnInit() {
	}

}
