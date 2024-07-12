import { Emoji } from "./emoji.type";

export type PollMedia = {
    text: string;
    emoji?: Emoji;
};

export type PollAnswer = {
    answer_id: number;
    poll_media: PollMedia;
};

export type Poll = {
    question: PollMedia;
    answers: PollAnswer[];
    duration: number;
    allow_multiselect: boolean;
    layout_type?: number;
};