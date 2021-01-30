import {ModelBase} from '../Base/base.model';

export class VideosModel extends ModelBase {

	public content:string;
	public title:string;
	public slug:string;
	public link:string;
	public is_active:boolean;

	constructor(id: number) {
		super(id);
	}

	public list() {
		return {
			'id': this.id,
			'title' : this.title,
			'slug' : this.slug,
			'content' : this.content,
			'link' : this.link,
			'is_active' : this.is_active,
		};
	}


}
