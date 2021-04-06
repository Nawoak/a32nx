import React, { useState } from 'react';
import { Toggle } from '../Components/Form/Toggle';
import { SelectGroup, SelectItem } from '../Components/Form/Select';
import { Slider } from '../Components/Form/Slider';
import { usePersistentProperty, useSimVarSyncedPersistentProperty } from '../../Common/persistence';

type ButtonType = {
    name: string,
    setting: string,
}

const PlaneSettings = () => {
    const [adirsAlignTime, setAdirsAlignTime] = usePersistentProperty('CONFIG_ALIGN_TIME', 'REAL');
    const [dmcSelfTestTime, setDmcSelfTestTime] = usePersistentProperty('CONFIG_SELF_TEST_TIME', '12');
    const [atisSource, setAtisSource] = usePersistentProperty('CONFIG_ATIS_SRC', 'FAA');
    const [metarSource, setMetarSource] = usePersistentProperty('CONFIG_METAR_SRC', 'MSFS');
    const [tafSource, setTafSource] = usePersistentProperty('CONFIG_TAF_SRC', 'NOAA');
    const [thrustReductionAlt, setThrustReductionAlt] = usePersistentProperty('CONFIG_THR_RED_ALT', '1500');
    const [thrustReductionAltSetting, setThrustReductionAltSetting] = useState(thrustReductionAlt);
    const [accelerationAlt, setAccelerationAlt] = usePersistentProperty('CONFIG_ACCEL_ALT', '1500');
    const [accelerationAltSetting, setAccelerationAltSetting] = useState(accelerationAlt);
    const [accelerationOutAlt, setAccelerationOutAlt] = usePersistentProperty('CONFIG_ENG_OUT_ACCEL_ALT', '1500');
    const [accelerationOutAltSetting, setAccelerationOutAltSetting] = useState(accelerationOutAlt);
    const [defaultBaro, setDefaultBaro] = usePersistentProperty('CONFIG_INIT_BARO_UNIT', 'IN HG');
    const [weightUnit, setWeightUnit] = usePersistentProperty('CONFIG_USING_METRIC_UNIT', '1');
    const [paxSigns, setPaxSigns] = usePersistentProperty('CONFIG_USING_PORTABLE_DEVICES', '0');

    const adirsAlignTimeButtons: ButtonType[] = [
        { name: 'Instant', setting: 'INSTANT' },
        { name: 'Fast', setting: 'FAST' },
        { name: 'Real', setting: 'REAL' },
    ];

    const dmcSelfTestTimeButtons: ButtonType[] = [
        { name: 'Instant', setting: '0' },
        { name: 'Fast', setting: '5' },
        { name: 'Real', setting: '12' },
    ];

    const atisSourceButtons: ButtonType[] = [
        { name: 'FAA (US)', setting: 'FAA' },
        { name: 'PilotEdge', setting: 'PILOTEDGE' },
        { name: 'IVAO', setting: 'IVAO' },
        { name: 'VATSIM', setting: 'VATSIM' },
    ];

    const metarSourceButtons: ButtonType[] = [
        { name: 'MeteoBlue', setting: 'MSFS' },
        { name: 'PilotEdge', setting: 'PILOTEDGE' },
        { name: 'IVAO', setting: 'IVAO' },
        { name: 'VATSIM', setting: 'VATSIM' },
    ];

    const tafSourceButtons: ButtonType[] = [
        { name: 'IVAO', setting: 'IVAO' },
        { name: 'NOAA', setting: 'NOAA' },
    ];

    const defaultBaroButtons: ButtonType[] = [
        { name: 'Auto', setting: 'AUTO' },
        { name: 'in Hg', setting: 'IN HG' },
        { name: 'hPa', setting: 'HPA' },
    ];

    const weightUnitButtons: ButtonType[] = [
        { name: 'Kg', setting: '1' },
        { name: 'lbs', setting: '0' },
    ];

    const paxSignsButtons: ButtonType[] = [
        { name: 'No Portable Device', setting: '0' },
        { name: 'No Smoking', setting: '1' },
    ];

    const handleSetThrustReductionAlt = (value: string) => {
        setThrustReductionAltSetting(value);

        const parsedValue = parseInt(value);

        if (parsedValue >= 400 && parsedValue <= 5000) {
            setThrustReductionAlt(value.trim());
        }
    };

    const handleSetAccelerationAlt = (value: string) => {
        setAccelerationAltSetting(value);

        const parsedValue = parseInt(value);

        if (parsedValue >= 400 && parsedValue <= 10000) {
            setAccelerationAlt(value.trim());
        }
    };

    const handleSetAccelerationOutAlt = (value: string) => {
        setAccelerationOutAltSetting(value);

        const parsedValue = parseInt(value);

        if (parsedValue >= 400 && parsedValue <= 10000) {
            setAccelerationOutAlt(value.trim());
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl px-6 py-4 shadow-lg overflow-scroll h-efb">
            <h1 className="text-xl font-medium text-white mb-3">Realism</h1>

            <div className="divide-y divide-gray-700 flex flex-col">
                <div className="mb-3.5 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">ADIRS Align Time</span>
                    <SelectGroup>
                        {adirsAlignTimeButtons.map((button) => (
                            <SelectItem
                                onSelect={() => setAdirsAlignTime(button.setting)}
                                selected={adirsAlignTime === button.setting}
                            >
                                {button.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </div>
                <div className="pt-3 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">DMC self-test Time</span>
                    <SelectGroup>
                        {dmcSelfTestTimeButtons.map((button) => (
                            <SelectItem
                                onSelect={() => setDmcSelfTestTime(button.setting)}
                                selected={dmcSelfTestTime === button.setting}
                            >
                                {button.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </div>
            </div>

            <h1 className="text-xl text-white font-medium mt-4 mb-3">ATSU/AOC</h1>

            <div className="divide-y divide-gray-700 flex flex-col">
                <div className="mb-3.5 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">ATIS Source</span>
                    <SelectGroup>
                        {atisSourceButtons.map((button) => (
                            <SelectItem
                                onSelect={() => setAtisSource(button.setting)}
                                selected={atisSource === button.setting}
                            >
                                {button.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </div>
                <div className="mb-3.5 pt-3 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">METAR Source</span>
                    <SelectGroup>
                        {metarSourceButtons.map((button) => (
                            <SelectItem
                                onSelect={() => setMetarSource(button.setting)}
                                selected={metarSource === button.setting}
                            >
                                {button.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </div>
                <div className="pt-3 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">TAF Source</span>
                    <SelectGroup>
                        {tafSourceButtons.map((button) => (
                            <SelectItem
                                onSelect={() => setTafSource(button.setting)}
                                selected={tafSource === button.setting}
                            >
                                {button.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </div>
            </div>

            <h1 className="text-xl text-white font-medium mt-4 mb-3">FMGC</h1>

            <div className="divide-y divide-gray-700 flex flex-col">
                <div className="mb-3.5 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">Thrust Reduction Altitude (ft)</span>
                    <div className="flex flex-row">
                        <input
                            type="text"
                            className="w-30 ml-1.5 px-5 py-1.5 text-lg text-gray-300 rounded-lg bg-navy-light
                            border-2 border-navy-light focus-within:outline-none focus-within:border-teal-light-contrast text-center"
                            placeholder={thrustReductionAlt}
                            value={thrustReductionAltSetting}
                            onChange={(event) => handleSetThrustReductionAlt(event.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3.5 pt-3 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">Acceleration Altitude (ft)</span>
                    <div className="flex flex-row">
                        <input
                            type="text"
                            className="w-30 ml-1.5 px-5 py-1.5 text-lg text-gray-300 rounded-lg bg-navy-light
                            border-2 border-navy-light focus-within:outline-none focus-within:border-teal-light-contrast text-center"
                            placeholder={accelerationAlt}
                            value={accelerationAltSetting}
                            onChange={(event) => handleSetAccelerationAlt(event.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3.5 pt-3 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">Acceleration Out Altitude (ft)</span>
                    <div className="flex flex-row">
                        <input
                            type="text"
                            className="w-30 ml-1.5 px-5 py-1.5 text-lg text-gray-300 rounded-lg bg-navy-light
                            border-2 border-navy-light focus-within:outline-none focus-within:border-teal-light-contrast text-center"
                            placeholder={accelerationOutAlt}
                            value={accelerationOutAltSetting}
                            onChange={(event) => handleSetAccelerationOutAlt(event.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full pt-2 flex flex-row justify-between">
                    <div className="pt-2 pr-4 flex-grow flex flex-row justify-between items-center">
                        <span className="text-lg text-gray-300">Default Baro</span>
                        <SelectGroup>
                            {defaultBaroButtons.map((button) => (
                                <SelectItem
                                    onSelect={() => setDefaultBaro(button.setting)}
                                    selected={defaultBaro === button.setting}
                                >
                                    {button.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </div>
                    <div className="pt-2 pl-4 flex-grow flex flex-row justify-between items-center">
                        <span className="text-lg text-gray-300">Weight Unit</span>
                        <SelectGroup>
                            {weightUnitButtons.map((button) => (
                                <SelectItem
                                    onSelect={() => setWeightUnit(button.setting)}
                                    selected={weightUnit === button.setting}
                                >
                                    {button.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </div>
                </div>
            </div>

            <h1 className="text-xl text-white font-medium mt-4 mb-3">CIDS</h1>

            <div className="divide-y divide-gray-700 flex flex-col">
                <div className="mb-3.5 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">PAX Signs</span>
                    <SelectGroup>
                        {paxSignsButtons.map((button) => (
                            <SelectItem
                                onSelect={() => setPaxSigns(button.setting)}
                                selected={paxSigns === button.setting}
                            >
                                {button.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </div>
            </div>
        </div>
    );
};

const SoundSettings = () => {
    const [ptuAudible, setPtuAudible] = useSimVarSyncedPersistentProperty('L:A32NX_SOUND_PTU_AUDIBLE_COCKPIT', 'Bool', 'SOUND_PTU_AUDIBLE_COCKPIT');
    const [exteriorVolume, setExteriorVolume] = useSimVarSyncedPersistentProperty('L:A32NX_SOUND_EXTERIOR_MASTER', 'number', 'SOUND_EXTERIOR_MASTER');
    const [engineVolume, setEngineVolume] = useSimVarSyncedPersistentProperty('L:A32NX_SOUND_INTERIOR_ENGINE', 'number', 'SOUND_INTERIOR_ENGINE');
    const [windVolume, setWindVolume] = useSimVarSyncedPersistentProperty('L:A32NX_SOUND_INTERIOR_WIND', 'number', 'SOUND_INTERIOR_WIND');

    return (
        <div className="bg-gray-800 rounded-xl px-6 py-4 shadow-lg">
            <div className="divide-y divide-gray-700 flex flex-col">
                <div className="mb-4 flex flex-row justify-between items-center">
                    <span>
                        <span className="text-lg text-gray-300">PTU Audible in Cockpit</span>
                        <span className="text-lg text-gray-500 ml-2">(unrealistic)</span>
                    </span>
                    <Toggle value={!!ptuAudible} onToggle={(value) => setPtuAudible(value ? 1 : 0)} />
                </div>
                <div className="mb-4 pt-3 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">Exterior Master Volume</span>
                    <div className="flex flex-row items-center">
                        <span className="text-base pr-3">{exteriorVolume}</span>
                        <Slider className="w-60" value={exteriorVolume + 50} onInput={(value) => setExteriorVolume(value - 50)} />
                    </div>
                </div>
                <div className="mb-4 pt-3 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">Engine Interior Volume</span>
                    <div className="flex flex-row items-center">
                        <span className="text-base pr-3">{engineVolume}</span>
                        <Slider className="w-60" value={engineVolume + 50} onInput={(value) => setEngineVolume(value - 50)} />
                    </div>
                </div>
                <div className="pt-3 flex flex-row justify-between items-center">
                    <span className="text-lg text-gray-300">Wind Interior Volume</span>
                    <div className="flex flex-row items-center">
                        <span className="text-base pr-3">{windVolume}</span>
                        <Slider className="w-60" value={windVolume + 50} onInput={(value) => setWindVolume(value - 50)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FlyPadSettings = () => {
    const [brightness, setBrightness] = useSimVarSyncedPersistentProperty('L:A32NX_EFB_BRIGHTNESS', 'number', 'EFB_BRIGHTNESS');

    return (
        <div className="bg-gray-800 divide-y divide-gray-700 flex flex-col rounded-xl px-6 py-4 shadow-lg">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg text-gray-300">Brightness</span>
                <Slider className="w-60" value={brightness} onInput={(value) => setBrightness(value)} />
            </div>
        </div>
    );
};

const IntegrationSettings = (props: {simbriefUsername, setSimbriefUsername}) => (
    <div className="bg-gray-800 divide-y divide-gray-700 flex flex-col rounded-xl px-6 py-4 shadow-lg">
        <div className="flex flex-row justify-between items-center">
            <span className="text-lg text-gray-300">Simbrief Username</span>
            <input
                type="text"
                className="w-30 ml-1.5 px-5 py-1.5 text-xl text-gray-300 rounded-lg bg-navy-light border-2 border-navy-light focus-within:outline-none focus-within:border-teal-light-contrast"
                value={props.simbriefUsername}
                onChange={(event) => props.setSimbriefUsername(event.target.value)}
            />
        </div>
    </div>
);

const Settings = (props: {simbriefUsername, setSimbriefUsername}) => (
    <div className="w-full h-full flex flex-col">
        <div className="flex-grow m-6 rounded-xl flex flex-row">
            <div className="w-1/2 pr-3">
                <h1 className="text-2xl text-white mb-4">Plane Settings</h1>
                <PlaneSettings />
            </div>
            <div className="w-1/2 pl-3">
                <h1 className="text-2xl text-white mb-4">Audio Settings</h1>
                <SoundSettings />

                <h1 className="text-2xl text-white mt-5 mb-4">flyPad Settings</h1>
                <FlyPadSettings />

                <h1 className="text-2xl text-white mt-5 mb-4">Integration</h1>
                <IntegrationSettings simbriefUsername={props.simbriefUsername} setSimbriefUsername={props.setSimbriefUsername} />

                <h1 className="text-4xl text-center text-gray-700 pt-10">flyPadOS</h1>
                <h1 className="text-xl text-center text-gray-600 py-2">vAlpha</h1>
                <h1 className="text-md text-center text-gray-700 py-2">Copyright &copy; 2020-2021 FlyByWire Simulations</h1>
            </div>
        </div>
    </div>
);

export default Settings;
