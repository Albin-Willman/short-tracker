require 'open-uri'
class Downloader

  def run(file_name, date)
    open(file_path(file_name), 'wb') do |file|
      file << open(build_url(date)).read
    end
    file_path(file_name)
  end

  private

  def file_path(file_name)
    @file_path ||= File.join(File.dirname(__FILE__), file_name)
  end

  def build_url(date)
    "http://www.fi.se/upload/50_Marknadsinfo/Blankning/Korta_positioner_#{date}.xls"
  end
end

