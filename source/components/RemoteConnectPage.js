import React, { Component } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Cell, CellGroup, CellInput } from "react-native-cell-components";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";
import DropboxAuthButton from "../containers/DropboxAuthButton.js";
import GoogleDriveAuthButton from "../containers/GoogleDriveAuthButton.js";
import Spinner from "./Spinner.js";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        width: "100%"
    },
    connectButton: {
        backgroundColor: "rgb(0, 183, 172)",
        marginTop: 15
    }
});

class RemoteConnectPage extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: `${params.title}`
        };
    };

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        switch (this.props.archiveType) {
            case "dropbox":
                return this.renderDropbox();
            case "googledrive":
                return this.renderGoogleDrive();
            case "webdav":
                return this.renderWebDAV();
            case "owncloud":
                return this.renderWebDAV();
            case "nextcloud":
                return this.renderWebDAV();
            default:
                return null;
        }
    }

    renderDropbox() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View>
                        <DropboxAuthButton />
                        <CellGroup>
                            <Cell
                                title={this.props.t("remote.connect")}
                                icon="cloud"
                                onPress={() => this.submit()}
                                tintColor="#1144FF"
                                disabled={!this.props.dropboxAuthenticated}
                            />
                        </CellGroup>
                    </View>
                    <Spinner
                        visible={this.props.connecting}
                        text={this.props.t("remote.connecting")}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderGoogleDrive() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View>
                        <GoogleDriveAuthButton />
                        <CellGroup>
                            <Cell
                                title={this.props.t("remote.connect")}
                                icon={{ name: "cloud", source: "material-community-icons" }}
                                onPress={() => this.submit()}
                                tintColor="#1144FF"
                                disabled={!this.props.googleDriveAuthenticated}
                            />
                        </CellGroup>
                    </View>
                    <Spinner
                        visible={this.props.connecting}
                        text={this.props.t("remote.connecting")}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderWebDAV() {
        const base = {
            autoCapitalize: "none",
            autoCorrect: false,
            keyboardType: "default",
            spellCheck: false
        };
        const urlInputOptions = { ...base, keyboardType: "url" };
        const usernameInputOptions = { ...base, keyboardType: "email-address" };
        const passwordInputOptions = { ...base, secureTextEntry: true };
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <CellGroup header={this.props.t("remote.connection-details")}>
                        <CellInput
                            title={this.props.t("remote.url")}
                            value={this.props.url}
                            icon={{ name: "laptop", source: "material-community-icons" }}
                            onChangeText={newText => this.props.onChangeURL(newText)}
                            {...urlInputOptions}
                        />
                        <CellInput
                            title={this.props.t("remote.username")}
                            value={this.props.username}
                            icon={{ name: "face", source: "material-community-icons" }}
                            onChangeText={newText => this.props.onChangeUsername(newText)}
                            {...usernameInputOptions}
                        />
                        <CellInput
                            title={this.props.t("remote.password")}
                            value={this.props.password}
                            icon={{ name: "fingerprint", source: "material" }}
                            onChangeText={newText => this.props.onChangePassword(newText)}
                            {...passwordInputOptions}
                        />
                    </CellGroup>
                    <CellGroup>
                        <Cell
                            title={this.props.t("remote.connect")}
                            icon="cloud"
                            onPress={() => this.submit()}
                            tintColor="#1144FF"
                        />
                    </CellGroup>
                    <Spinner
                        visible={this.props.connecting}
                        text={this.props.t("remote.connecting")}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    submit() {
        Keyboard.dismiss();
        this.props.onConnectPressed();
        this.props.initiateConnection();
    }
}

RemoteConnectPage.propTypes = {
    archiveType: PropTypes.string,
    connecting: PropTypes.bool,
    dropboxAuthenticated: PropTypes.bool,
    googleDriveAuthenticated: PropTypes.bool,
    initiateConnection: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeURL: PropTypes.func,
    onChangeUsername: PropTypes.func,
    onConnectPressed: PropTypes.func,
    password: PropTypes.string,
    url: PropTypes.string,
    username: PropTypes.string
};

RemoteConnectPage.defaultProps = {
    dropboxAuthenticated: false
};

export default withNamespaces()(RemoteConnectPage);
