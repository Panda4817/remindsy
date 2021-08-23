import React from "react";
import { StyleSheet, Modal, FlatList, View } from "react-native";
import colours from "../../constants/Colours";
import CustomButton from "../UI/CustomButton";
import CustomText from "../UI/CustomText";
import ResultItem from "./ResultItem";

const ResultsModal = (props: any) => {
	return (
		<Modal visible={props.open} animationType="slide" onRequestClose={props.cancelModal}>
			<View>
				<CustomText style={styles.text}>Select a contact from the search results</CustomText>
				<FlatList
					data={props.data}
					keyExtractor={(item) => item.id}
					renderItem={(itemData) => (
						<ResultItem
							name={itemData.item.name}
							date={itemData.item.birthday}
							address={itemData.item.addresses}
							onSelect={() => props.useContact(itemData.item)}
						/>
					)}
				/>
				<CustomButton
					onPress={props.cancelModal}
					style={{
						backgroundColor: colours.darkPink,
						marginHorizontal: 50,
					}}
				>
					<CustomText
						style={{
							...styles.buttonText,
							color: "white",
						}}
					>
						Cancel
					</CustomText>
				</CustomButton>
			</View>
		</Modal>
	);
};

export default ResultsModal;

const styles = StyleSheet.create({
	buttonText: {
		fontSize: 18,
		marginVertical: 10,
	},
	text: {
		textAlign: "center",
		fontSize: 18,
		marginVertical: 10,
	},
});
