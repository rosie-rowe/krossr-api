import { Injectable } from "@angular/core";
import { LevelList } from "./LevelList";
import { HttpClient, HttpParams } from "@angular/common/http";
import { LevelParams } from "../../modules/levels/level/LevelParams";
@Injectable({
    providedIn: 'root'
})
export class LevelService {
    static $name = 'levelService';

    constructor(
        private httpClient: HttpClient
    ) {
    }

    /**
     * Converts a base64 string that decodes into a binary string into a layout
     * This assumes the layout was square, like most everything else
     */
    decodeLayout(layout): Boolean[][] {
        // base64 string to binary string
        var binary: string = atob(layout);

        // how many characters of that binary string we should grab at once
        var sideLength = Math.sqrt(binary.length);

        var regexp = new RegExp('.{1,' + sideLength + '}', 'g');

        // evenly split up binary strings
        var split: string[] = binary.match(regexp);

        // convert to actual layout
        var resultLayout = split.map(function(binaryString) {
            return binaryString.split('').map(function(value) {
                return value === '1';
            });
        });

        return resultLayout;
    }

    getLevels(query: any): Promise<LevelList> {
        return this.httpClient.get('levels', {
            params: new HttpParams({ fromObject: query})
        }).toPromise().then((result: LevelList) => result);
    }

    updateLevel(params: LevelParams) {
        return this.httpClient.put(`levels/${params.id}`, params).toPromise();
    }

    removeLevel(levelId: number) {
        return this.httpClient.delete(`levels/${levelId}`).toPromise();
    }
}