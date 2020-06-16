import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class LevelService {
    static $name = 'levelService';

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
}