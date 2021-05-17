import React, { useState } from "react";
import {
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import { FormikValues } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import Event from "../models/eventClass";
import FormikForm from "../components/appSpecific/FormikForm";

const AddEditScreen = (props: any) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const { navigation, route } = props;
	const eventId = route.params ? route.params.id : null;
	const selectedEvent: Event = useSelector((state: any) =>
		state.events.events.find(
			(event: Event) => event.id === eventId
		)
	);

	const submitHandler = async (values: FormikValues) => {
		setError("");
		setIsLoading(true);
		try {
			if (selectedEvent) {
				dispatch(
					actions.editEvent(
						parseInt(eventId),
						values.firstName,
						values.secondName,
						values.day,
						values.month,
						values.type,
						values.startYear,
						values.noticeTime,
						values.present,
						values.ideas,
						values.address,
						values.pushNotification
					)
				);
			} else {
				dispatch(
					actions.addEvent(
						values.firstName,
						values.secondName,
						values.day,
						values.month,
						values.type,
						values.startYear,
						values.noticeTime,
						values.present,
						values.ideas,
						values.address,
						values.pushNotification
					)
				);
			}
			navigation.goBack();
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	const dispatch = useDispatch();
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior="height"
		>
			<ScrollView>
				<FormikForm
					submitHandler={submitHandler}
					navigation={navigation}
					route={route}
					isLoading={isLoading}
					selectedEvent={selectedEvent}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export const screenOptions = (navData: any) => {
	let title = "Add a Remindsy";
	if (navData.route.params.id) {
		title = "Edit a Remindsy";
	}
	return {
		headerTitle: title,
	};
};

export default AddEditScreen;

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
