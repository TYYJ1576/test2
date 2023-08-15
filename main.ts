/**
* Functions to WuKong multifunctional expansion board by ELECFREAKS Co.,Ltd.
*/
//% color=#fd00fd  icon="\uf231" block="PI" blockId="PI"
namespace PI {
    const board_address = 0x10
    /**
    * LightMode
    */
    export enum LightMode {
        //% block="BREATH"
        BREATH,
        //% block="OFF"
        OFF
    }

    export enum Boo {
        //% block="True"
        T,
        //% block="False
        F
    }
    /**
    * MotorList
    */
    export enum MotorList {
        //% block="M1"
        M1,
        //% block="M2"
        M2
    }
    /**
    * ServoList
    */
    export enum ServoList {
        //% block="S0" enumval=0
        S0,
        //% block="S1" enumval=1
        S1,
        //% block="S2" enumval=2
        S2,
        //% block="S3" enumval=3
        S3,
        //% block="S4" enumval=4
        S4,
        //% block="S5" enumval=5
        S5,
        //% block="S6" enumval=6
        S6,
        //% block="S7" enumval=7
        S7
    }
    /**
    * ServoTypeList
    */
    export enum ServoTypeList {
        //% block="180°" 
        _180,
        //% block="270°"
        _270,
        //% block="360°" 
        _360
    }

    //% weight=90
    //% blockId=setMotorSpeed block="Set motor %motor speed to %speed"
    //% speed.min=-100 speed.max=100
    export function setMotorSpeed(motor: MotorList, speed: number): void {
        let buf = pins.createBuffer(4);
        switch (motor) {
            case MotorList.M1:
                buf[0] = 0x01;
                buf[1] = 0x01;
                if (speed < 0) {
                    buf[1] = 0x02;
                    speed = speed * -1
                }
                buf[2] = speed;
                buf[3] = 0;
                pins.i2cWriteBuffer(board_address, buf);
                break;
            case MotorList.M2:
                buf[0] = 0x02;
                buf[1] = 0x01;
                if (speed < 0) {
                    buf[1] = 0x02;
                    speed = speed * -1
                }
                buf[2] = speed;
                buf[3] = 0;
                pins.i2cWriteBuffer(board_address, buf);
                break;
            default:
                break;
        }
    }

    //% weight=89
    //% blockId=setAllMotor block="set motor M1 speed %m1speed M2 speed %m2speed"
    //% m1speed.min=-100 m1speed.max=100
    //% m2speed.min=-100 m2speed.max=100
    export function setAllMotor(m1speed: number, m2speed: number): void {
        setMotorSpeed(MotorList.M1, m1speed)
        setMotorSpeed(MotorList.M2, m2speed)
    }

    //% weight=88
    //% blockId=stopMotor block="Stop motor %motor"
    export function stopMotor(motor: MotorList): void {
        setMotorSpeed(motor, 0)
    }

    //% weight=87
    //% blockId=stopAllMotor  block="Stop all motor"
    export function stopAllMotor(): void {
        setMotorSpeed(MotorList.M1, 0)
        setMotorSpeed(MotorList.M2, 0)
    }

    //% weight=86
    //% blockId=turnLeft  block="turn left with speed %speed"
    //% speed.min=-100 speed.max=100
    export function turnLeft(speed: number): void {
        setMotorSpeed(MotorList.M1, 0)
        setMotorSpeed(MotorList.M2, speed)
    }

    //% weight=85
    //% blockId=turnRight  block="turn right with speed %speed"
    //% speed.min=-100 speed.max=100
    export function turnRight(speed: number): void {
        setMotorSpeed(MotorList.M1, speed)
        setMotorSpeed(MotorList.M2, 0)
    }

    //% weight=84
    //% blockId=goForward  block="go forward with speed %speed"
    //% speed.min=-100 speed.max=100
    export function goForward(speed: number): void {
        setMotorSpeed(MotorList.M1, speed)
        setMotorSpeed(MotorList.M2, speed)
    }

    //% weight=83
    //% blockId=goBack  block="go Backward with speed %speed"
    //% speed.min=-100 speed.max=100
    export function goBackward(speed: number): void {
        setMotorSpeed(MotorList.M1, -speed)
        setMotorSpeed(MotorList.M2, -speed)
    }

    //% weight=82
    //% blockId=followLine  block="follow line set to %boo with speed %speed"
    export function followLine(boo: Boo, speed: number): void {
        if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P15) == 0) {
            goForward(speed)
        } else if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P15) == 1) {
            turnRight(speed)
        } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P15) == 0) {
            turnLeft(speed)
        } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P15) == 1) {
            setMotorSpeed(MotorList.M1, -speed)
            setMotorSpeed(MotorList.M2, speed)
        }
    }
}