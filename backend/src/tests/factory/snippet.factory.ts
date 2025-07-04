import mongoose from "mongoose";

export const snippetMockedId = new mongoose.Types.ObjectId().toString();
export const snippetMockedIdToRaise404Error = new mongoose.Types.ObjectId().toString();

export const mockedSnippetRequest = {
    text: 'testing',
    summary: 'mocked summary',
}

export const mockedSnippet = {
    _id: snippetMockedId,
    text: 'testing',
    summary: 'mocked summary',
}