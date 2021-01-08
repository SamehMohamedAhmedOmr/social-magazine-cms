import {BaseSerializer} from '../Base/Base.serializer';
import {Serializer} from '../Base/Serializer';
import {EventsModel} from '../../models/section-module/events.model';

export class EventsSerializer extends BaseSerializer implements Serializer {

	fromJson(json: any): EventsModel {
		return this.adapt(json.body);
	}

	fromJsonList(json: any): [] {
		return this.adaptList(json.body, json.pagination);
	}

	toJson(model: EventsModel): any {
		let object =  {
			id : model.id,
			title : model.title,
			content : model.content,
			is_active : model.is_active,
			date: model.date,
		};

		if (model.images.length){
			object['images'] = model.images;
		}

		return object;
	}

	toFormData(object: EventsModel): FormData {
		return null;
	}

	public adapt(item: any): EventsModel {
		let object = new EventsModel(
			item.id
		);

		object.title = item.title;
		object.content = item.content;

		object.images = item.images;

		object.date = item.date;

		object.is_active = item.is_active;

		return object;
	}


	status(status): any {
		return {
			'is_active' : status,
		};
	}

}
