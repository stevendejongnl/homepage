import { useTranslation } from "next-i18next";
import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;
  const { data: realtimeVisitors, error: realtimeVisitorsError } = useWidgetAPI(widget, "realtimeVisitors");
  const { data: aggregate, error: aggregateError } = useWidgetAPI(widget, "aggregate");

  console.log(realtimeVisitors, aggregate['results']);

  if (realtimeVisitorsError || aggregateError || false) {
    const finalError = realtimeVisitorsError ?? aggregateError ?? false;
    return <Container service={service} error={finalError} />;
  }

  return (
    <Container service={service}>
      <Block label="plausible.realtimeVisitors" value={t("common.number", { value: realtimeVisitors })}/>

      {aggregate?.['results']?.['bounce_rate'] ? (
        <Block label="plausible.aggregateBouncerate" value={t("common.number", { value: aggregate['results']['bounce_rate']['value'] })}/>
      ) : null}

      {aggregate?.['results']?.['pageviews'] ? (
        <Block label="plausible.aggregatePageviews" value={t("common.number", { value: aggregate['results']['pageviews']['value'] })}/>
      ) : null}

      {aggregate?.['results']?.['visit_duration'] ? (
        <Block label="plausible.aggregateVisitDuration" value={t("common.number", { value: aggregate['results']['visit_duration']['value'] })}/>
      ) : null}

      {aggregate?.['results']?.['visitors'] ? (
        <Block label="plausible.aggregateVisitors" value={t("common.number", { value: aggregate['results']['visitors']['value'] })}/>
      ) : null}
    </Container>
  );
}
