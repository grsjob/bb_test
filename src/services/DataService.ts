import axios from "axios";
import settings from "../config/settings";
import { IEpisode } from "../types/episode";

axios.defaults.baseURL = settings.baseApiUrl;

export default class DataService {

    static async fetchData(): Promise<IEpisode[]> {
            const { data } = await axios.get<IEpisode[]>('/episodes')
            return data
    }
}