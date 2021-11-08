import React, { useState, useEffect } from "react";
import * as webRTCHandler from "../webRTC/webRTCHandler";
import styled, { css } from "styled-components";

import { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { getMyDevices } from "store/actions/devicesActions";

const ControlPanelContainer = styled.div<{ isShowControlPanel: string }>`
  position: fixed;
  bottom: 10px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
  max-height: 300px;
  width: 100%;
  ${props =>
    props.isShowControlPanel === "true"
      ? css`
          z-index: 13;
          opacity: 1;
          left: 0;
        `
      : css`
          z-index: -20;
          opacity: 0;
          left: -100%;
        `}

  transition: all 0.5s;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ForceUpdateForGetDivces = styled.div`
  display: flex;
  padding: 10px;
  color: black;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 10px;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: black;
    font-weight: 600;
    color: white;
  }
`;

const VideoDevicesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 300px;
  border-radius: 10px;
  padding: 5px;
`;
const VideoDevicesTitle = styled.div``;
const VideoDevicesSelect = styled.select``;

const AudioDevicesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 300px;
  border-radius: 10px;
  padding: 5px;
`;
const AudioDevicesTitle = styled.div``;
const AudioDevicesSelect = styled.select``;
const DeviceItem = styled.option``;

const SharingButtonWrapper = styled.div<{ isScreenSharingActivate: string }>`
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  transition: all 0.5s;
  background-color: ${props =>
    props.isScreenSharingActivate === "true" ? "red" : "blue"};
  color: white;
  font-weight: 500;

  &:hover {
    transform: scale(1.2);
    background-color: black;
    color: white;
  }
`;

interface Props {
  isShowControlPanel: string;
}
const ControlPanel = ({ isShowControlPanel }: Props) => {
  const [counterIndexForForceUpdate, setCounterIndexForForceUpdate] =
    useState(0);

  const dispatch = useDispatch();

  const videoDevices = useSelector(
    (state: RootState) => state.devices.videoDevices
  );

  const audioDevices = useSelector(
    (state: RootState) => state.devices.audioDevices
  );

  const selectedVideoDeviceLabel = useSelector(
    (state: RootState) => state.devices.selectedVideoDeviceLabel
  );
  const selectedAudioDeviceLabel = useSelector(
    (state: RootState) => state.devices.selectedAudioDeviceLabel
  );

  const isScreenSharingActivate = useSelector(
    (state: RootState) => state.toggles.isScreenSharingActive
  );

  const myStream = useSelector((state: RootState) => state.streams.myStream);
  useEffect(() => {
    console.log("useEffect rerendering in ContrlPanel");
    // counterIndexForForceUpdate변수를 이용하여 장치리스트를 다시 불러오기 위한 작업
    if (myStream instanceof MediaStream) {
      dispatch(getMyDevices());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myStream, counterIndexForForceUpdate]);

  const handleVideoSwitching = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    webRTCHandler.videoInputDeviceSwitching(event.target.value);
  };

  const handleAudioSwitching = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    webRTCHandler.audioInputDeviceSwitching(event.target.value);
  };

  const handleSharingScreen = () => {
    webRTCHandler.switchForScreenSharingStream();
  };
  return (
    <ControlPanelContainer isShowControlPanel={isShowControlPanel}>
      {/* 디바이스의 장치가 변경됐을때(예를들면 에어팟 블루투스 연결 및 해제) 연결된 장치리스트 최신화 기능 */}
      {/* 연결된 비디오 및 오디오 장치리스트를 웹에서 실시간 감지는 못하니 수동으로라도 최신화 시켜주기 */}
      <ForceUpdateForGetDivces
        onClick={() => setCounterIndexForForceUpdate(prev => prev + 1)}
      >
        ForceUpdate
      </ForceUpdateForGetDivces>
      <VideoDevicesWrapper>
        <VideoDevicesTitle>Video Divices</VideoDevicesTitle>
        <div>{selectedVideoDeviceLabel}</div>
        {/* 비디오 리스트 셀렉트 */}
        {videoDevices.length !== 0 && (
          <VideoDevicesSelect
            defaultValue={selectedVideoDeviceLabel}
            onChange={event => handleVideoSwitching(event)}
          >
            {Array.isArray(videoDevices) &&
              videoDevices.map((videoDevice: any, index: number) => {
                return (
                  <DeviceItem key={index} value={videoDevice.label}>
                    {videoDevice.label}
                  </DeviceItem>
                );
              })}
          </VideoDevicesSelect>
        )}
      </VideoDevicesWrapper>

      <AudioDevicesWrapper>
        <AudioDevicesTitle>Audio devices</AudioDevicesTitle>
        {/* 오디오 리스트 셀렉트 */}
        {audioDevices.length !== 0 && (
          <AudioDevicesSelect
            defaultValue={selectedAudioDeviceLabel}
            onChange={event => handleAudioSwitching(event)}
          >
            {Array.isArray(audioDevices) &&
              audioDevices.map((audioDevice: any, index: number) => {
                return (
                  <DeviceItem key={index} value={audioDevice.label}>
                    {audioDevice.label}
                  </DeviceItem>
                );
              })}
          </AudioDevicesSelect>
        )}
      </AudioDevicesWrapper>

      <SharingButtonWrapper
        onClick={handleSharingScreen}
        isScreenSharingActivate={String(isScreenSharingActivate)}
      >
        {isScreenSharingActivate ? (
          <>Turn off screen Sharing</>
        ) : (
          <>Thrun on screen Sharing</>
        )}
      </SharingButtonWrapper>
    </ControlPanelContainer>
  );
};

export default ControlPanel;
