import React, { ReactNode } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { EventBox } from "../EventBox";

interface DraggableItemProps {
    index: number;
    draggingIndex: SharedValue<number>;
    positions: SharedValue<number[]>;
    children: ReactNode;
    onDragEnd: (dragIndex: number) => void;

}

export const DraggableItem: React.FC<DraggableItemProps> = ({ index, draggingIndex, positions, children, onDragEnd }) => {
    const isDragging = useSharedValue(false);
    const offsetY = useSharedValue(positions.value[index]);

    const gesture = Gesture.Pan()
        .onBegin(() => {
            isDragging.value = true;
            draggingIndex.value = index;
        })
        .onUpdate((event) => {
            offsetY.value = event.translationY + positions.value[index];
        })
        .onEnd(() => {
            isDragging.value = false;
            runOnJS(onDragEnd)
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: isDragging.value ? offsetY.value : withSpring(positions.value[index]) },
            { scale: isDragging.value ? 1.1 : 1 },
        ],
        zIndex: isDragging.value ? 100 : 1,
    }));

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </GestureDetector>
    )


}