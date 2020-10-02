import JavaScriptBuild._
import scoverage.ScoverageKeys
import uk.gov.hmrc.DefaultBuildSettings._
import uk.gov.hmrc.SbtArtifactory
import uk.gov.hmrc.sbtdistributables.SbtDistributablesPlugin.publishingSettings

val appName = "digital-engagement-platform-frontend"

lazy val scoverageSettings = {
  Seq(
    ScoverageKeys.coverageExcludedPackages :="""uk\.gov\.hmrc\.BuildInfo;.*\.Routes;.*\.RoutesPrefix;.*\.ErrorTemplate;.*\.ErrorHandler;.*\.TestOnlyTemplate;.*\.TestOnlyView;.*\.Reverse[^.]*""",
    ScoverageKeys.coverageMinimum := 80,
    ScoverageKeys.coverageFailOnMinimum := false,
    ScoverageKeys.coverageHighlighting := true
  )
}

lazy val microservice = Project(appName, file("."))
  .enablePlugins(play.sbt.PlayScala, SbtAutoBuildPlugin, SbtGitVersioning, SbtDistributablesPlugin, SbtArtifactory, ScoverageSbtPlugin)
  .disablePlugins(JUnitXmlReportPlugin)
  .configs(IntegrationTest)
  .settings(integrationTestSettings(): _*)
  .settings(
    majorVersion                     := 0,
    libraryDependencies ++= AppDependencies.all,
    publishingSettings,
    javaScriptTestRunnerHook,
    defaultSettings(),
    scalaVersion := "2.12.8",
    PlayKeys.playDefaultPort := 9956,
    TwirlKeys.templateImports ++= Seq(
      "play.twirl.api.HtmlFormat",
      "play.twirl.api.HtmlFormat._",
      "uk.gov.hmrc.play.views.html.helpers._",
      "uk.gov.hmrc.play.views.html.layouts._"
    ),
    Concat.groups := Seq("javascripts/all-service.js" -> group(Seq("javascripts/parseData.js", "javascripts/gtm_dl.js"))),
    pipelineStages in Assets := Seq(concat),
    scoverageSettings,
    resolvers += Resolver.jcenterRepo
  )
