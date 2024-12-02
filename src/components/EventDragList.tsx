import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { trigger } from "react-native-haptic-feedback";
import { useFocusEffect } from "@react-navigation/native";

//Types
import { AnticipateRootState } from "../redux/types/AnticipateRootState";
import { EventType } from "../redux/types/EventType";

//Actions
import { reorderEvents } from "../redux/reducers/EventReducer";
import { EventBox } from "./EventBox";
import { TouchableOpacity } from "react-native";

export const EventDragList = () => {
    const events = useSelector((state: AnticipateRootState) => state.events);
    const [localevents, setLocalevents] = useState(events);
    const dispatch = useDispatch();

    const handleOrderChange = useCallback((newData: EventType[]) => {
        setLocalevents(newData);
    }, []);

    //Update redux state when user navigates away
    useFocusEffect(useCallback(() => {
        return () => {
            dispatch(reorderEvents(localevents));
        };
    }, [dispatch])
    );

    const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<typeof events[0]>) => {

        const handleMove = () => {
            trigger('impactHeavy', { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
            drag();
        }

        return (
            <TouchableOpacity
                onLongPress={handleMove}
                disabled={isActive}
                style={{
                    marginVertical: 5,
                }}
            >
                <EventBox event={item} isActive={isActive} onLongPress={handleMove} />
            </TouchableOpacity >
        )
    }, []);


    return (
        <DraggableFlatList
            data={localevents}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => handleOrderChange(data)}
            renderItem={renderItem}
            containerStyle={{ flex: 1, paddingHorizontal: 5 }}
        />
    );
}