import { UIRouter } from "@uirouter/core";

export function uiRouterConfigFn(router: UIRouter) {
    router.urlService.rules.initial({ state: 'home' })
}