import {BaseSerializer} from '../Base/Base.serializer';
import {Serializer} from '../Base/Serializer';
import {PhotosModel} from '../../models/section-module/photos.model';

export class PhotosSerializer extends BaseSerializer implements Serializer {

	fromJson(json: any): PhotosModel {
		return this.adapt(json.body);
	}

	fromJsonList(json: any): [] {
		return this.adaptList(json.body, json.pagination);
	}

	toJson(model: PhotosModel): any {
		let object =  {
			id : model.id,
			title : model.title,
			content : model.content,
			is_active : model.is_active,
		};

		if (model.images.length){
			object['images'] = model.images;
		}

		return object;
	}

	toFormData(object: PhotosModel): FormData {
		return null;
	}

	public adapt(item: any): PhotosModel {
		let object = new PhotosModel(
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
