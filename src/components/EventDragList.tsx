import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DraggableFlatList, { NestableDraggableFlatList, NestableScrollContainer, RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { Text } from '@ui-kitten/components';

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
        console.log(newData[0].title);
        console.log(newData[1].title);
        setLocalevents(newData);

        // dispatch(reorderEvents(newData));
    }, []);

    const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<typeof events[0]>) => (

        <ScaleDecorator>
            <TouchableOpacity
                onLongPress={drag}
                disabled={isActive}
                style={{
                    // height: 75,
                    borderWidth: 1,
                    borderColor: 'pink',
                    marginVertical: 5,
                }}
            >
                {/* <Text style={{ height: 75 }} onLongPress={drag}>{item.title}</Text> */}
                <EventBox event={item} isActive={isActive} onLongPress={drag} />
            </TouchableOpacity >
        </ScaleDecorator>
    ), []);


    return (
        <DraggableFlatList
            data={localevents}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => handleOrderChange(data)}
            renderItem={renderItem}
            containerStyle={{ flex: 1, paddingHorizontal: 5, overflow: 'scroll' }}
        />
    );
}