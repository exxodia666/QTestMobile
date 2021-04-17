import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IChoiceTypes } from '../../models/ChoicesModel/IChoices'
import CheckBoxComponent from './CheckBoxComponent'


type CheckGroup = {
    choices: IChoiceTypes[]
}

const CheckGroupComponent: React.FC<CheckGroup> = ({ choices }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', padding: 5, borderWidth: 1 }}>
            {choices.map(item =>
                <CheckBoxComponent
                    question_id={item.question_id}
                    id={item.id}
                    isSelected={item.isSelected}
                    toggleSelect={item.toggleSelect}
                    text={item.text}
                />
            )}
        </View>
    )
}

export default CheckGroupComponent

const styles = StyleSheet.create({})
