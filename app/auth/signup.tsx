import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform, Image } from 'react-native'
import { Link } from 'expo-router';

import React from 'react'

const signup = () => {
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.formContainer}>
    
            <Image
              style={styles.logo}
              source={require('@/assets/common/logo.png')}
            />
            <Text style={styles.appName}>Game Mind</Text>
            <Text style={styles.welcome}>
              Welcome to the world of healing
            </Text>
    
            {/* Name */}
            <TextInput
              placeholderTextColor={'#AEAEAE'}
              placeholder="Name"
              style={styles.input}
            />
    
            {/* Email */}
            <TextInput
              keyboardType="email-address"
              placeholderTextColor={'#AEAEAE'}
              placeholder="Email"
              style={styles.input}
            />
    
            {/* Password */}
            <TextInput
              placeholderTextColor={'#AEAEAE'}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
    
            {/* Repeat password */}
            <TextInput
              secureTextEntry
              placeholderTextColor={'#AEAEAE'}
              placeholder="Repeat Password"
              style={styles.input}
            />
    
            {/* Signup button */}
            <Pressable
              style={[styles.btn, { marginTop: 20 }]}>
              <Text style={styles.btnText}>Sign Up</Text>
            </Pressable>
    
            {/* Login navigation */}
            <Pressable
              style={styles.loginContainer}>
              <Text style={styles.haveAccountLabel}>
                Already have an account?{'  '}
                <Link href='/auth/login'>
                  <Text style={styles.loginLabel}>Login</Text>
                </Link>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    formContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
    },
    appName: {
      color: 'rgba(134, 65, 244, 1)',
      fontSize: 40,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#FCF8FF',
      padding: 10,
      height: 40,
      alignSelf: 'center',
      borderRadius: 5,
  
      width: '80%',
      color: '#000000',
  
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 1,
    },
    errorText: {
      color: 'red',
      alignSelf: 'center',
      marginTop: 10,
    },
    btn: {
      backgroundColor: '#ffffff',
      padding: 10,
      height: 45,
  
      alignSelf: 'center',
      borderRadius: 5,
      width: '80%',
      marginTop: 10,
  
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 3,
    },
    btnText: {
      color: '#484848',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
    loginContainer: {
      marginTop: 60,
    },
    haveAccountLabel: {
      color: '#484848',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 15,
    },
    welcome: {
      color: '#484848',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 12,
      marginBottom: 15,
    },
    loginLabel: {
      color: '#1d9bf0',
    },
    logo: {
      width: 150,
      height: 150,
      alignSelf: 'center',
    }
  });

export default signup