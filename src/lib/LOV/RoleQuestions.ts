import { Question, QuestionTypeEnum } from 'entities/questions';
import { RoleTypeEnum } from 'entities/Roles';
import Translate from 'lib/Translate';

interface QuestionLov {
    role: RoleTypeEnum;
    questions: Question[];
}

const Questions: QuestionLov[] = [{
    role: RoleTypeEnum.Artist,
    questions: [{
        questionIndex: 1,
        questionEn: Translate.t('Question.Artist.Q1'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 2,
        questionEn: Translate.t('Question.Artist.Q2'),
        type: QuestionTypeEnum.Upload,
    }, {
        questionIndex: 3,
        questionEn: Translate.t('Question.Artist.Q3'),

        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 4,
        questionEn: Translate.t('Question.Artist.Q4'),

        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 5,
        questionEn: Translate.t('Question.Artist.Q5'),

        type: QuestionTypeEnum.Text,
    }],
}, {
    role: RoleTypeEnum.ContentCreator,
    questions: [{
        questionIndex: 1,
        questionEn: Translate.t('Question.ContentCreator.Q1'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 2,
        questionEn: Translate.t('Question.ContentCreator.Q2'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 3,
        questionEn: Translate.t('Question.ContentCreator.Q3'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 4,
        questionEn: Translate.t('Question.ContentCreator.Q4'),
        type: QuestionTypeEnum.Text,
    }],
}, {
    role: RoleTypeEnum.Storyteller,
    questions: [{
        questionIndex: 1,
        questionEn: Translate.t('Question.StoryTeller.Q1'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 2,
        questionEn: Translate.t('Question.StoryTeller.Q2'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 3,
        questionEn: Translate.t('Question.StoryTeller.Q3'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 4,
        questionEn: Translate.t('Question.StoryTeller.Q4'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 5,
        questionEn: Translate.t('Question.StoryTeller.Q5'),
        type: QuestionTypeEnum.Upload,
    }],
}, {
    role: RoleTypeEnum.Flipper,
    questions: [{
        questionIndex: 1,
        questionEn: Translate.t('Question.Flipper.Q1'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 2,
        questionEn: Translate.t('Question.Flipper.Q2'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 3,
        questionEn: Translate.t('Question.Flipper.Q3'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 4,
        questionEn: Translate.t('Question.Flipper.Q4'),
        type: QuestionTypeEnum.Text,
    }],
}, {
    role: RoleTypeEnum.ESports,
    questions: [{
        questionIndex: 1,
        questionEn: Translate.t('Question.Esports.Q1'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 2,
        questionEn: Translate.t('Question.Esports.Q2'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 3,
        questionEn: Translate.t('Question.Esports.Q3'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 4,
        questionEn: Translate.t('Question.Esports.Q4'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 5,
        questionEn: Translate.t('Question.Esports.Q5'),
        type: QuestionTypeEnum.Text,
    }],
}, {
    role: RoleTypeEnum.Entrepreneur,
    questions: [{
        questionIndex: 1,
        questionEn: Translate.t('Question.Entrepreneur.Q1'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 2,
        questionEn: Translate.t('Question.Entrepreneur.Q2'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 3,
        questionEn: Translate.t('Question.Entrepreneur.Q3'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 4,
        questionEn: Translate.t('Question.Entrepreneur.Q4'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 5,
        questionEn: Translate.t('Question.Entrepreneur.Q5'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 6,
        questionEn: Translate.t('Question.Entrepreneur.Q6'),
        type: QuestionTypeEnum.Text,
    }],
},
{
    role: RoleTypeEnum.Builders,
    questions: [{
        questionIndex: 1,
        questionEn: Translate.t('Question.Builder.Q1'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 2,
        questionEn: Translate.t('Question.Builder.Q2'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 3,
        questionEn: Translate.t('Question.Builder.Q3'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 4,
        questionEn: Translate.t('Question.Builder.Q4'),
        type: QuestionTypeEnum.Text,
    }],
},
{
    role: RoleTypeEnum.Lost,
    questions: [{
        questionIndex: 1,
        questionEn: Translate.t('Question.ImLost.Q1'),
        type: QuestionTypeEnum.None,
    }, {
        questionIndex: 2,
        questionEn: Translate.t('Question.ImLost.Q2'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 3,
        questionEn: Translate.t('Question.ImLost.Q3'),
        type: QuestionTypeEnum.None,
    }, {
        questionIndex: 4,
        questionEn: Translate.t('Question.ImLost.Q4'),
        type: QuestionTypeEnum.Text,
    }, {
        questionIndex: 5,
        questionEn: Translate.t('Question.ImLost.Q5'),
        type: QuestionTypeEnum.Text,
    }],
}];

export default Questions;
