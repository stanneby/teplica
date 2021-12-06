export interface IPresenter {
  notifyOfCreation(): IPresenter;
  stopGrowth(): IPresenter;
  startGrowth(name: string): IPresenter;
}
