import com.typesafe.sbt.packager.Keys._
import play.sbt.PlayImport.PlayKeys
import sbt.Keys._
import sbt._

object JavaScriptBuild {
  val uiDirectory = SettingKey[File]("ui-directory")
  val gulpBuild = TaskKey[Int]("gulp-build")
  val gulpWatch = TaskKey[Int]("gulp-watch")
  val gulpTest = TaskKey[Int]("gulp-test")
  val npmInstall = TaskKey[Int]("npm-install")

  val javaScriptTestRunnerHook = Seq(

    // the JavaScript application resides in "ui"
    uiDirectory := {(baseDirectory in Compile) { _ / "test" }}.value,

    // add "npm" and "gulp" commands in sbt
    commands ++= {uiDirectory { base => Seq(Gulp.gulpCommand(base), npmCommand(base))}}.value,

    npmInstall := {
      val result = Gulp.npmProcess(uiDirectory.value, "install").run().exitValue()
      if (result != 0)
        throw new Exception("npm install failed.")
      result
    },
    gulpBuild := {
      val result = Gulp.gulpProcess(uiDirectory.value, "default").run().exitValue()
      if (result != 0)
        throw new Exception("gulp build failed.")
      result
    },

    gulpTest := {
      val result = Gulp.gulpProcess(uiDirectory.value, "test").run().exitValue()
      if (result != 0)
        throw new Exception("javascript tests failed")
      result
    },

    gulpTest := {gulpTest dependsOn npmInstall}.value,
    gulpBuild := {gulpBuild dependsOn npmInstall}.value,

    // runs gulp before staging the application
    dist := {dist dependsOn gulpBuild}.value,

    (test in Test) := {(test in Test) dependsOn gulpTest}.value,
  )

  def npmCommand(base: File) = Command.args("npm", "<npm-command>") { (state, args) =>
    if (sys.props("os.name").toLowerCase contains "windows") {
      scala.sys.process.Process("cmd" :: "/c" :: "npm" :: args.toList, base) !
    }
    else {
      scala.sys.process.Process("npm" :: args.toList, base) !
    }
    state
  }

}
