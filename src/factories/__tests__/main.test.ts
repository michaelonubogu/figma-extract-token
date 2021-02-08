import {MainFactory} from '../main';
import {CONFIG_MOCK_DEFAULT, FIGMA_MOCK_DEFAULT} from '../../__mock__';
import {Config} from '../../interfaces';
import {ParentFactory} from '../parent';

describe('MainFactory', () => {
  it('should create successfully', () => {
    const factory = new MainFactory();
    factory.config = CONFIG_MOCK_DEFAULT as Config;
    factory.json = FIGMA_MOCK_DEFAULT as any;
    expect(factory.foundation).toBeInstanceOf(ParentFactory);
    expect(factory.components).toBeInstanceOf(ParentFactory);
  });

  it('should compose json successfully', () => {
    const factory = new MainFactory();
    factory.config = CONFIG_MOCK_DEFAULT as Config;
    factory.json = FIGMA_MOCK_DEFAULT as any;
    factory.foundation.call(factory.config.foundation);
    factory.components.call(factory.config.components);
    expect(factory.compose()).toEqual({
      color: {
        grey: {
          100: {value: 'rgba(224, 224, 224, 1)'},
          main: {value: 'rgba(0, 0, 0, 1)'}
        },
        primary: {
          100: {value: 'rgba(188, 159, 231, 1)'},
          main: {value: 'rgba(98, 0, 238, 1)'}
        },
        secondary: {
          100: {value: 'rgba(218, 152, 199, 1)'},
          main: {value: 'rgba(169, 66, 140, 1)'}
        }
      },
      typography: {
        base: {
          fontFamily: {value: 'Roboto'},
          fontWeight: {value: 500},
          fontSize: {value: '14px'},
          lineHeight: {value: '16px'},
        },
        button: {
          lineHeight: {value: '{typography.base.lineHeight}'},
          fontSize: {value: '{typography.base.fontSize}'},
          fontWeight: {value: '{typography.base.fontWeight}'},
          textTransform: {value: 'uppercase'},
        }
      },
      button: {
        outlined: {
          lineHeight: {value: '{typography.button.lineHeight}'},
          fontSize: {value: '{typography.button.fontSize}'},
          fontWeight: {value: '{typography.button.fontWeight}'},
          textTransform: {value: '{typography.button.textTransform}'},
        },
      },
    })
  });
});
