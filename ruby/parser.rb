require "simple-spreadsheet"
require 'date'

class XlsParser
  def run(file_path)
    @file_path = file_path
    @result = {}
    parse_file
    @result
  end

  private

  def parse_file
    file.first_row.upto(file.last_row) do |line|
      parse_line(line)
    end
  end

  def parse_line(line)
    return unless valid_date?(file.cell(line, 1))
    actor = file.cell(line, 2)
    return if actor.gsub(/[^0-9a-z]/i, '') == 'IngapublikapositionerpubliceradesNopublicpositionswerepublished'
    company_name = file.cell(line, 3)

    company = company_name.partition(" ").first.downcase
    amount = file.cell(line, 5)
    amount = 0 if file.cell(line, 7) && file.cell(line, 7).gsub(/[^0-9a-z]/i, '').include?("Fallitunder05")
    date = Date.parse(file.cell(line, 6).to_s)

    @result[company] = {
      name: company_name,
      actors: {}
    } unless @result[company]

    actor_key = actor.partition(" ").first.downcase

    @result[company][:actors][actor_key] = {
      name: actor,
      positions: {}
    } unless @result[company][:actors][actor_key]

    @result[company][:actors][actor_key][:positions][date.to_s] = amount
  end

  def file
    @file ||= SimpleSpreadsheet::Workbook.read(@file_path)
  end

  def valid_date?(date)
    date.is_a? Date
  end
end