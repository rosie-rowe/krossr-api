export interface ViewModelMapper<TModel, TViewModel> {
    toViewModel(model: TModel): TViewModel;
}
