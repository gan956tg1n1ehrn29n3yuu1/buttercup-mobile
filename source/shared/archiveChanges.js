import { getSharedArchiveManager } from "../library/buttercup.js";
import {
    addLockedSource,
    addUnlockedSource
} from "../actions/archives.js";

function normaliseSourceInfo(sourceInfo) {
    return {
        id: sourceInfo.id,
        name: sourceInfo.name,
        status: sourceInfo.status,
        type: sourceInfo.type
    };
}

export function linkArchiveManagerToStore(store) {
    const { dispatch } = store;
    const archiveManager = getSharedArchiveManager();
    // listen for new archives
    archiveManager.on("sourceAdded", function __handleNewSource(sourceInfo) {
        console.log("Source added", sourceInfo);
        const source = normaliseSourceInfo(sourceInfo);
        dispatch(addUnlockedSource(source));
    });
    archiveManager.on("sourceRehydrated", function __handleRehydratedSource(sourceInfo) {
        console.log("Source rehydrated", sourceInfo);
        const source = normaliseSourceInfo(sourceInfo);
        dispatch(addLockedSource(source));
    });
}