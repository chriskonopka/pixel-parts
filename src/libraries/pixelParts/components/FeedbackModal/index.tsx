// src/components/FeedbackModal/index.tsx
import * as React from 'react';
import classnames from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CheckmarkCircleRegular, ErrorCircleRegular } from '@fluentui/react-icons';

import Button from '../Button';
import FlexBox from '../FlexBox';
import FlexBoxItem from '../FlexBoxItem';
import Modal from '../Modal';
import TextElement from '../TextElement';
import Dropdown from '../Dropdown';
import bullhorn from '../../../../assets/images/bull-horn.png';
import spinner from '../../../../assets/images/spinner.svg';

import styles from './FeedbackModal.module.scss';

export interface IFeedbackFormValues {
  Comments: string;
  FollowUp: boolean;
  /** optional, only present when `inputOptions` is passed */
  inputType?: string;
}

export interface ISubmitResponse {
  status: 'success' | 'error';
  message: string;
}

export interface IFeedbackModalProps {
  /** Whether the modal is an alert */
  isAlert?: boolean;
  /** Title of the modal */
  title: string;
  /** Title of the feedback form */
  formTitle?: string;
  /** Subtitle of the feedback form */
  formSubtitle?: string;
  /** Event triggered on modal close */
  onClose: () => void;
  /** now includes `inputType` when `inputOptions` is provided */
  onSubmit: (formData: IFeedbackFormValues) => void;
  /** Response from the submit action */
  submitResponse?: ISubmitResponse;
  /**
   * If passed, renders a dropdown above the comment box
   * for the user to select a feedback “type.”
   */
  inputOptions?: { key: string; text: string }[];
  /** Whether to show the follow-up checkbox */
  showFollowUpCheckbox?: boolean;
  /** Z-index for the modal */
  zIndex?: number;
}

const FeedbackModal: React.FC<IFeedbackModalProps> = props => {
  const {
    title,
    formTitle = 'Your feedback helps us improve!',
    formSubtitle =
      "We'd love to hear what didn't work for you. Let us know how we can improve.",
    onClose,
    onSubmit,
    submitResponse,
    inputOptions,
    showFollowUpCheckbox = true,
    zIndex = 10
  } = props;

  // initial values: FollowUp always true if follow-up section hidden
  const initialValues: IFeedbackFormValues = {
    Comments: '',
    FollowUp: true,
    inputType: inputOptions?.[0]?.key ?? '',
  };

  const validationShape: Record<string, any> = {
    Comments: yup.string().required('Please enter your feedback.'),
  };
  if (inputOptions) {
    validationShape.inputType = yup
      .string()
      .required('Please select a feedback type.');
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
    isSubmitting,
    isValid,
  } = useFormik<IFeedbackFormValues>({
    validateOnMount: true,
    initialValues,
    validationSchema: yup.object().shape(validationShape),
    onSubmit: formData => onSubmit(formData),
  });

  return (
    <Modal
      zIndex={zIndex}
      title={title}
      footer={
        <FlexBox style={{ width: 600 }} spacing={16}>
          <FlexBoxItem flexGrow={1} flexBasis={0}>
            <Button
              onClick={onClose}
              text="Close"
              variant="lightGray"
              fullWidth
            />
          </FlexBoxItem>
          {!submitResponse && (
            <FlexBoxItem flexGrow={1} flexBasis={0}>
              <Button
                onClick={() => handleSubmit()}
                {...(isSubmitting && {
                  icon: (
                    <img
                      src={spinner}
                      alt="spinner"
                      loading="lazy"
                      height={20}
                    />
                  ),
                })}
                text={isSubmitting ? 'Sending feedback...' : 'Submit Feedback'}
                disabled={!isValid || isSubmitting}
                variant="green"
                fullWidth
              />
            </FlexBoxItem>
          )}
        </FlexBox>
      }
    >
      <form className={styles.feedBackForm} noValidate>
        {submitResponse ? (
          <FlexBox
            classNames={classnames(styles.feedBackForm__confirmation, {
              [styles.hasError]: submitResponse.status === 'error',
            })}
            alignItems="center"
            justifyContent="center"
            spacing={20}
          >
            {submitResponse.status === 'success' ? (
              <CheckmarkCircleRegular aria-hidden="true" focusable={false} />
            ) : (
              <ErrorCircleRegular aria-hidden="true" focusable={false} />
            )}
            <FlexBoxItem flexGrow={1}>
              <TextElement as="div" weight={600}>
                {submitResponse.status === 'success'
                  ? 'Thanks for sharing your thoughts!'
                  : 'Oops—something went wrong.'}
              </TextElement>
              <TextElement as="div">{submitResponse.message}</TextElement>
            </FlexBoxItem>
          </FlexBox>
        ) : (
          <>
            <FlexBox
              spacing={20}
              alignItems="center"
              classNames={styles.feedBackForm__title}
            >
              <FlexBoxItem>
                <img
                  src={bullhorn}
                  loading="lazy"
                  alt="bull horn"
                  height={50}
                />
              </FlexBoxItem>
              <FlexBoxItem>
                <TextElement as="div" weight={600}>
                  {formTitle}
                </TextElement>
                <TextElement as="div">{formSubtitle}</TextElement>
              </FlexBoxItem>
            </FlexBox>

            {/* INLINE: feedback type dropdown */}
            {inputOptions && (
              <>
                <FlexBox
                  direction="row"
                  alignItems="center"
                  spacing={8}
                  classNames={styles.feedBackForm__inputType}
                >
                  <TextElement weight={600}>Feedback Type</TextElement>
                  <Dropdown
                    variant="light"
                    selectedKey={values.inputType}
                    dropdownOptions={inputOptions}
                    onChange={(_, option) =>
                      option?.key &&
                      setFieldValue('inputType', option.key as string)
                    }
                    width={250}
                  />
                </FlexBox>
                {touched.inputType && errors.inputType && (
                  <div className={styles.feedBackForm__error}>
                    {errors.inputType}
                  </div>
                )}
              </>
            )}

            <textarea
              className={styles.feedBackForm__textarea}
              maxLength={5000}
              name="Comments"
              placeholder="Describe your experience or suggest an improvement..."
              onChange={handleChange}
              value={values.Comments}
            />
            {touched.Comments && errors.Comments && (
              <div className={styles.feedBackForm__error}>
                {errors.Comments}
              </div>
            )}

            {showFollowUpCheckbox && (
              <>
                <label
                  htmlFor="allowFollowUp"
                  className={styles.feedBackForm__label}
                >
                  <input
                    className={styles.feedBackForm__input}
                    id="allowFollowUp"
                    type="checkbox"
                    name="FollowUp"
                    onChange={() => {
                      setFieldValue('FollowUp', !values.FollowUp)
                        .catch(() => {
                          /* ignore */
                        });
                  }}
                    checked={values.FollowUp}
                  />
                  <TextElement weight={600}>Allow Follow-up</TextElement>
                </label>
                <div
                  className={styles.feedBackForm__radioButtonDescription}
                >
                  <i>I'm open to follow-up if needed.</i>
                </div>
              </>
            )}
          </>
        )}
      </form>
    </Modal>
  );
};

export default FeedbackModal;
