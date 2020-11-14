import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView } from "react-native";
import EmptyFridge from "../components/EmptyFridge";
import Background from "../components/Background";
import { readAllData, fbReadAllData, fbRemoveDataByOne } from "../utils/storageManager";
import { db } from "../utils/config";
import NonEmptyFridge from "../components/NonEmptyFridge";
import Modal from 'react-native-modal';
import ExpiredItem from "../components/ExpiredItem";


export default function ViewItems(props) {
    const [data, setData] = useState([]);
    const [expiredData, setExpiredData] = useState([]);
    const [isEmptyFridge, setIsEmptyFridge] = useState(true);
    const [didMount, setDidMount] = useState(false); 
    const [isModalVisible, setIsModalVisible] = useState(false);

    
    useEffect(() => {
        // async function fetch() {
        //     const dataFromStorage = await readAllData();
        //     setData(dataFromStorage);
        //     if (dataFromStorage.length !== 0 ) {
        //         setIsEmptyFridge(false);
        //     } else {
        //         setIsEmptyFridge(true);
        //     }
        // }
        // fetch();
        setDidMount(true)
        // if (mounted) {
            db.ref("/items").on("value", (dataSnapshot) => {
                let data = dataSnapshot.val() ? dataSnapshot.val() : {};
                let items = Object.values(data);
                setData(items.sort((a, b) => (a.expiryDate > b. expiryDate) ? 1 : -1));
                if (items.length !== 0 ) {
                    setIsEmptyFridge(false);
                } else {
                    setIsEmptyFridge(true);
                }
                let expired = items.filter((items) => items.expiryDate <= 0);
                loadExpiredItem(expired)
                if (expired.length!=0) {
                    setIsModalVisible(true)
                }
            });
        // }
        return () => setDidMount(false);
    }, []);

    const loadExpiredItem = async (item) => {
        await setExpiredData(item);
    };

    confirmModal = () => {
        let currentData = data;
        let removingData = expiredData;
        let newData = currentData.filter((i) => {
            if (removingData.indexOf(i)!==-1) {
                fbRemoveDataByOne(i.key)
            }
            return (removingData.indexOf(i)===-1)
        });
        setData(newData);
        setIsModalVisible(false);
    }

    closeModal = () => {
        setIsModalVisible(false);
    }

    let content = <EmptyFridge navigation={props.navigation}/>;
    if (!isEmptyFridge) {
        content = <NonEmptyFridge data={data} navigation={props.navigation} updateData = {setData}/>;
    }
    
    return (
    <Background>
        {content}
        <Modal 
            onBackButtonPress={()=>closeModal()}
            isVisible={isModalVisible}
            style={styles.modalStyle}
        >
            <View style={styles.textbox}>
                <Text>These items are expired</Text>
                <Text>Do you want to remove them?</Text>
            </View>

            <View style={styles.listview}>
                <ExpiredItem
                    data={expiredData}
                    updateData={setExpiredData}
                />
            </View>
            
            <View style={{ flex: 1,justifyContent:'center',position:'absolute',bottom:0}}>
                <View style={{flexDirection:'row',}}>
                    <TouchableOpacity style={styles.confirmButton} onPress={()=>confirmModal()}>
                        <Text style={{color:'white',textAlign:'center',padding:10}}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={()=>closeModal()}>
                        <Text style={{color:'white',textAlign:'center',padding:10}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </Background>);
}

const styles = StyleSheet.create({
    modalStyle: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'50%',
        backgroundColor:'white', 
        maxHeight:'50%',
        borderRadius:20,
    },
    confirmButton: {
        backgroundColor:'green',
        width:'50%',
        borderBottomLeftRadius:20
    },
    cancelButton: {
        backgroundColor:'red',
        width:'50%',
        borderBottomRightRadius:20,
    },
    rowFront: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgb(52, 52, 52)",
        borderRadius: 5,
        height: 100,
        margin: 5,
        marginBottom: 5,
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    warningImage:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    productname: {
        fontSize: 20,
        marginBottom: 5,
        color: "#f2e6d7",
        fontFamily: "Arial Rounded MT Bold",
    },
    expiryDate: {
        fontSize: 15,
        color: "#f2e6d7",
    },
    image: {
        width: 90,
        height: 90,
        flex: 2,
    },
    contentContainer: {
        // backgroundColor:"blue",
        flex: 5,
        paddingLeft: 15,
    },
    listview: {
        width:"90%",
        maxHeight:"70%",
    },
    textbox: {
        
    }
});
