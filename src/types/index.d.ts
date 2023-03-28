// External Types
export type Cb = () => void;

export type CbCalc = (res: number) => void;

export type CountdownInputType = {
  date: DayOfMonth;
  month: MonthType;
  year: number;
  hour: HourOfDay;
  minute: MinuteNSecondType;
  second: MinuteNSecondType;
};
export interface StateType {
  [key: string]: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export enum ReducerTypes {
  days = "days",
  hours = "hours",
  minutes = "minutes",
  seconds = "seconds",
}
export type DispatchType = (action: { type: string; payload: number }) => void;

export type RunCallbackType = (property: string, value: number) => void;

// Internal Types
type MonthType =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUN"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER";

type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

type HourOfDay =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;
type MinuteNSecondType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60;
