import com.typesafe.sbt.packager.Keys._
import play.sbt.PlayImport.PlayKeys
import sbt.Keys._
import sbt._

object JavaScriptBuild {
  val configDirectory = SettingKey[File]("configDirectory")
  val runAllTests = TaskKey[Int]("runAllTests")
  val npmInstall = TaskKey[Int]("npm-install")

  val javaScriptTestRunnerHook = Seq(
    configDirectory := {(baseDirectory in Compile)}.value,

    npmInstall := {
      val result = Gulp.npmProcess(configDirectory.value, "install").run().exitValue()
      if (result != 0)
        throw new Exception("npm install failed.")
      result
    },
    runAllTests := {
      val result = Gulp.gulpProcess(configDirectory.value, "jest").run().exitValue()
      if (result != 0)
        throw new Exception("javascript tests failed")
      result
    },

    runAllTests := {runAllTests dependsOn npmInstall}.value,

    (test in Test) := {(test in Test) dependsOn runAllTests}.value,
  )
}
