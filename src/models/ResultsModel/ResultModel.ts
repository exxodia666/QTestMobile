import { observable, makeObservable } from 'mobx';
import ResultTypes from './ResultTypes';
class ResultModel implements ResultTypes {
    id: string = '';
    name: string = '';
    rating: number = 0;

    constructor(id: string, name: string, rating: number) {
        makeObservable(this, {
            rating: observable,
            id: observable,
            name: observable
        });
        this.id = id;
        this.name = name;
        this.rating = rating;
    }
}
export default ResultModel;