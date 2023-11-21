// actions.ts
import { createAction } from "@reduxjs/toolkit";

export const setSearchQuery = createAction("search/setQuery");
export const UserActionRequest = createAction("search/UserActionRequest");
export const UserActionReset = createAction("search/UserActionReset");
