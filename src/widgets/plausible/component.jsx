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
      <Block label="plausible.aggregate.bouncerate" value={t("common.number", { value: aggregate['results']['bounce_rate']['value'] })}/>
      <Block label="plausible.aggregate.pageviews" value={t("common.number", { value: aggregate['results']['pageviews']['value'] })}/>
      <Block label="plausible.aggregate.visit_duration" value={t("common.number", { value: aggregate['results']['visit_duration']['value'] })}/>
      <Block label="plausible.aggregate.visitors" value={t("common.number", { value: aggregate['results']['visitors']['value'] })}/>
    </Container>
  );
}
