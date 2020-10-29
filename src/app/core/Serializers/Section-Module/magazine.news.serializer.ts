import {BaseSerializer} from '../Base/Base.serializer';
import {Serializer} from '../Base/Serializer';
import {MagazineNewsModel} from '../../models/section-module/magazine.news.model';

export class MagazineNewsSerializer extends BaseSerializer implements Serializer {

	fromJson(json: any): MagazineNewsModel {
		return this.adapt(json.body);
	}

	fromJsonList(json: any): [] {
		return this.adaptList(json.body, json.pagination);
	}

	toJson(model: MagazineNewsModel): any {
		return {
			id : model.id,
			title : model.title,
			content : model.content,
			images : model.images,
			is_active : model.is_active,
		};
	}

	toFormData(object: MagazineNewsModel): FormData {
		return null;
	}

	public adapt(item: any): MagazineNewsModel {
		let object = new MagazineNewsModel(
			item.id
		);

		object.title = item.title;
		object.content = item.content;

		object.images = item.images;

		object.is_active = item.is_active;

		return object;
	}


	status(status): any {
		return {
			'is_active' : status,
		};
	}

}
