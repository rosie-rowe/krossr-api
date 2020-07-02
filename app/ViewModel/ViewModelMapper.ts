export interface ViewModelMapper<TModel, TViewModel> {
    toViewModel(model: TModel): TViewModel;
    toModel(viewModel: TViewModel): TModel;
}
