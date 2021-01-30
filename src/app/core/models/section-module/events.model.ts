import {ModelBase} from '../Base/base.model';

export class EventsModel extends ModelBase {

	public content:string;
	public title:string;
	public slug:string;
	public date:string;
	public images:[];
	public is_active:boolean;

	constructor(id: number) {
		super(id);
	}

	public list() {
		return {
			'id': this.id,
			'title' : this.title,
			'slug' : this.slug,
			'date' : this.date,
			'content' : this.content,
			'images' : this.images,
			'is_active' : this.is_active,
		};
	}


}
