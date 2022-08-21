import { StyleSheet, Text, View } from "react-native";

export default function Heading({children, level}){
    const headingLevel = level ? level : 3;
    return(
        <View style={styles.container}>
            <Text accessibilityRole={`h${headingLevel}`}>{children}</Text>
        </View>
    )
}