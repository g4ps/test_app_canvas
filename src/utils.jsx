import { createAssistant, createSmartappDebugger } from '@salutejs/client';

const initialize = (getState, getRecoveryState) => {
    const token = process.env.REACT_APP_ASSISTANT_TOKEN;
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            
            token: token,
            
            initPhrase: 'запусти rtyui',
            
            getState,
            
            getRecoveryState,
            
            nativePanel: {
                
                defaultText: '',
                
                screenshotMode: false,
                
                tabIndex: -1,
            },
        });
    }

    
    return createAssistant({ getState, getRecoveryState });
};

const sendAE = (name = "I_NEED_A_NAME", val={}) => {
    window.evg_assistant.sendData({ action: { type: name, payload: { param: val} } });
    
};


export {initialize, sendAE};
