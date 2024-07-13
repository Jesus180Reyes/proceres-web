export interface BarGraphResponse {
  ok: boolean;
  months: Month[];
  metrics: number[];
}

export interface Month {
  date: Date;
}
