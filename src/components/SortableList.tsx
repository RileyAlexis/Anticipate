import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSharedValue, runOnJS, withSpring } from "react-native-reanimated";

import { Layout } from "@ui-kitten/components";

import { AnticipateRootState } from "../redux/types/AnticipateRootState";
import { EventBox } from "./EventBox";
import { DraggableItem } from "./UI/DraggableItem";
import { Text } from "@ui-kitten/components";
import { View } from "react-native";

export const SortableList = () => {

    const separation = 25;
    const events = useSelector((state: AnticipateRootState) => state.events);
    const [list, setList] = useState(events);
    const positions = useSharedValue(events.map((_, index) => index * separation));
    const draggingIndex = useSharedValue(-1);

    const updateOrder = (from: number, to: number) => {
        const updatedList = [...list];
        const [movedItem] = updatedList.splice(from, 1);
        updatedList.splice(to, 0, movedItem);
        setList(updatedList);
    };

    const handleDragEnd = (dragIndex: number) => {
        "worklet";
        const newY = Math.round(positions.value[dragIndex] / separation) * separation;
        positions.value[dragIndex] = withSpring(newY); // Smooth transition to final position

        const newIndex = Math.round(newY / separation);
        if (newIndex !== dragIndex) {
            // updateOrder(dragIndex, newIndex);
        }
        draggingIndex.value = -1; // Reset dragging state
    };

    useEffect(() => {
        // console.log(list.length);
    }, [])

    return (
        <Layout style={{ flex: 1, paddingHorizontal: 5 }}>
            {list.map((item, index) => {
                return (
                    <DraggableItem key={index} index={index} draggingIndex={draggingIndex} positions={positions} onDragEnd={handleDragEnd}>
                        <EventBox event={item} />
                    </DraggableItem>
                )
            })}

        </Layout>
    )
}