import axios, {AxiosError, AxiosResponse} from "axios";
import settings from "../config/settings";
import {IEpisode} from "../types/episode";
import { Err, Ok, Result } from '@hqoss/monads';

axios.defaults.baseURL = settings.baseApiUrl;

export default class DataService {

    static async fetchData(): Promise<Result<IEpisode[], AxiosError >> {
        try {
            const { data } = await axios.get<IEpisode[]>('/episodes')
            return Ok(data)
        } catch (e) {
            return Err(e as AxiosError)
        }
    }
}