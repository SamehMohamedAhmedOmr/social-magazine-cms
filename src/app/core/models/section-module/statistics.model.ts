import {ModelBase} from '../Base/base.model';

export class StatisticsModel extends ModelBase {

	public visitors_count:number;
	public news_count:number;
	public activities_count:number;
	public events_count:number;
	public videos_count:number;
	public advisory_bodies_count:number;

	constructor(id: number) {
		super(id);
	}

	public list() {
		return {
			'id': this.id,
			'visitors_count' : this.visitors_count,
			'news_count' : this.news_count,
			'activities_count' : this.activities_count,
			'events_count' : this.events_count,
			'videos_count' : this.videos_count,
			'advisory_bodies_count' : this.advisory_bodies_count,
		};
	}


}
