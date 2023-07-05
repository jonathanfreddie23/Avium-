export enum QuestionTypeEnum {
    Text = 1,
    Upload = 2,
    None = 3,
}

export interface Question {
    questionIndex: number;
    questionEn: string;
    type: QuestionTypeEnum;
}
