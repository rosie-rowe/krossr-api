import { KrossrRequest } from "../KrossrRequest/KrossrRequest";
import { LevelListQuery } from "./LevelListQuery";

export interface LevelListRequest extends KrossrRequest<any, any, { [k in keyof LevelListQuery]: string}> {

}