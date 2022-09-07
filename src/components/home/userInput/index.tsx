import React, { useContext, useEffect } from "react";
import "animate.css";
import LanguageContext from "../../../store/languageContext";
import IThemeContext from "../../../store/themeContext";
import Grid from "@mui/material/Grid";
import { StyledForm } from "./styled";
import { useForm } from "react-hook-form";
import { FormInputs } from "./userInput";
import ErrorField from "./errorField";
import { focusImput } from "../../../customHook";

const UserInput = React.forwardRef<HTMLDivElement>((props, inputRef) => {
  const { text } = useContext(LanguageContext);
  const { Itheme } = useContext(IThemeContext);

  const {
    register,
    watch,
    getValues,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ criteriaMode: "all" });
  const onSubmit = (data: FormInputs) => console.log(data, errors);
  const watchFields = watch(["numOfIns", "insInterval", "taxRate"]);

  useEffect(() => {
    focusImput(getValues(), setFocus);
  }, [watchFields]);

  return (
    <>
      <StyledForm Itheme={Itheme} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Grid item xs={12} md={4}>
            <p>
              {text.home.principal} <span>:</span>
            </p>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="input" ref={inputRef}>
              <input
                autoComplete="off"
                placeholder={text.home.principalPlaceHolder}
                {...register("principal", {
                  required: text.home.errorField.required,
                  max: {
                    value: 100000000000,
                    message: text.home.errorField.principal.max,
                  },
                  min: {
                    value: 100,
                    message: text.home.errorField.principal.min,
                  },
                  pattern: {
                    value: /\d+/,
                    message: text.home.errorField.principal.pattern,
                  },
                })}
              />
            </div>
          </Grid>
          <Grid container item xs={12}>
            <ErrorField message={errors?.principal?.message || null} />
          </Grid>
          <Grid item xs={12} md={4}>
            <p>
              {text.home.profitRate} <span>:</span>
            </p>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="input">
              <input
                autoComplete="off"
                placeholder={text.home.profitRatePlaceHolder}
                {...register("profitRate", {
                  required: text.home.errorField.required,
                  max: {
                    value: 30,
                    message: text.home.errorField.profitRate.max,
                  },
                  min: {
                    value: 1.1,
                    message: text.home.errorField.profitRate.min,
                  },
                  pattern: {
                    value: /\d+/,
                    message: text.home.errorField.profitRate.pattern,
                  },
                })}
              />
            </div>
          </Grid>
          <Grid container item xs={12}>
            <ErrorField message={errors?.profitRate?.message || null} />
          </Grid>
          <Grid item xs={12} md={4}>
            <p>
              {text.home.numOfIns} <span>:</span>
            </p>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="select">
              <select
                {...register("numOfIns", {
                  required: text.home.errorField.required,
                })}
              >
                <option value=""> {text.home.numOfInsPlaceHolder} </option>
                {Array(12)
                  .fill("")
                  .map((item, idx) => (
                    <option value={(idx + 1) * 3}> {(idx + 1) * 3} </option>
                  ))}
              </select>
            </div>
          </Grid>
          <Grid container item xs={12}>
            <ErrorField message={errors?.numOfIns?.message || null} />
          </Grid>

          <Grid item xs={12} md={4}>
            <p>
              {text.home.insInterval} <span>:</span>
            </p>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="select">
              <select
                {...register("insInterval", {
                  required: text.home.errorField.required,
                })}
              >
                <option value=""> {text.home.insIntervalPlaceHolder} </option>
                <option value={text.home.insIntervalOptOne}>
                  {text.home.insIntervalOptOne}
                </option>
                <option value={text.home.insIntervalOptTwo}>
                  {text.home.insIntervalOptTwo}
                </option>
                <option value={text.home.insIntervalOptThree}>
                  {text.home.insIntervalOptThree}
                </option>
              </select>
            </div>
          </Grid>
          <Grid item container xs={12}>
            <ErrorField message={errors?.insInterval?.message || null} />
          </Grid>
          <Grid item xs={12} md={4}>
            <p>
              {text.home.taxRate} <span>:</span>
            </p>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="select">
              <select
                {...register("taxRate", {
                  required: text.home.errorField.required,
                })}
              >
                <option value=""> {text.home.taxRatePlaceHolder} </option>
                <option value="BSMV">BSMV</option>
                <option value="KKDF">KKDF</option>
              </select>
            </div>
          </Grid>
          <Grid item container xs={12}>
            <ErrorField message={errors?.taxRate?.message || null} />
          </Grid>
        </Grid>
        <button type="submit">{text.home.calculateButton}</button>
      </StyledForm>
    </>
  );
});

export default UserInput;
