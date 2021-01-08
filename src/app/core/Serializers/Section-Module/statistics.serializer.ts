import {BaseSerializer} from '../Base/Base.serializer';
import {Serializer} from '../Base/Serializer';
import {StatisticsModel} from '../../models/section-module/statistics.model';

export class StatisticsSerializer extends BaseSerializer implements Serializer {

	fromJson(json: any): StatisticsModel {
		return this.adapt(json.body);
	}

	fromJsonList(json: any): [] {
		return this.adaptList(json.body, json.pagination);
	}

	toJson(model: StatisticsModel): any {
		return {};
	}

	toFormData(object: StatisticsModel): FormData {
		return null;
	}

	public adapt(item: any): StatisticsModel {
		let object = new StatisticsModel(
			item.id
		);

		object.visitors_count = item.visitors_count;
		object.news_count = item.news_count;
		object.activities_count = item.activities_count;
		object.events_count = item.events_count;
		object.videos_count = item.videos_count;
		object.advisory_bodies_count = item.advisory_bodies_count;

		return object;
	}


	status(status): any {
		return {
			'is_active' : status,
		};
	}

}
