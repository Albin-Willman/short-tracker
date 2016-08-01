require 'json'
class DateList
  def run(stock, file_path)
    json =  JSON.parse(File.read(file_path))

    actors = json['companies'][stock]['actors']
    dates = []
    actors.each do |key, data|
      dates += data['positions'].keys if data['positions']
    end
    dates
  end
end